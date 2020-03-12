
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Buffer } from 'buffer/';
import { createWorker } from 'tesseract.js';

const videoConstraints = {
    width: 430,
    height: 800,
    facingMode: "user"
};

const WebcamCapture = (props) => {
    const webcamRef = React.useRef(null);

    let fileInput;
    useEffect(() => {
        fileInput = React.createRef();
        console.log(props)
    }, [])

    const [loading, setLoading] = useState(false)

    // handle capture when click it
    const capture = async () => {
        let imageSrc = webcamRef.current.getScreenshot();
        let base64string = imageSrc.replace(/^data:image\/jpeg;base64,/, "");
        setLoading(true);
        const worker = createWorker({
            logger: m => console.log(m)
        });

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(Buffer.from(base64string, 'base64'));

        // console.log(text)
        findKeyword(text);
        await worker.terminate();
    }

    // click upload
    const handleUpload = (e) => {
        setLoading(true);
        getBase64(e, async (base64string) => {
            const worker = createWorker({
                logger: m => console.log(m)
            });
            // handleImage(base64string);
            base64string = base64string.split(',')[1]
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const { data: { text } } = await worker.recognize(Buffer.from(base64string, 'base64'));

            findKeyword(text);
            //console.log(text)
            await worker.terminate();
        })

    }
    // find key words
    const findKeyword = (text) => {
        console.log(webcamRef)
        let arr = text.split('\n')
        let date = null
        let total = null
        arr.forEach(tx => {
            // try to find string that contain mm/dd/yyyy
            const found = tx.match(/(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/)
            if (found)
                date = found[0];
            // looking for total keyword
            let t = tx.split(' ');
            if (t[0].toLowerCase().includes('total')) {
                total = t[1];
            }
        })


        props.setData({ total: total || "none", date: date || "none", category: "none", payee: "unknow" })
        props.history.push('/dataform')


    }


    // convert input file data to base64string
    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            cb(reader.result)
        };
        reader.onerror = function(error) {
            console.log('Error: ', error);
        };
    }

    return (
        <div style={{ marginTop: '10%', textAlign: 'center' }}>

            <Webcam
                style={{ border: "1px solid lightgrey" }}
                audio={false}
                height={500}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={300}
                videoConstraints={videoConstraints}
            />
            <p>Descriptions</p>

            <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                <button onClick={capture} className="btn waves-effect waves-light btnc" name="action">Scan
                </button>
            </div>

            <div style={{ display: 'inline-block' }} >
                <input className='btn waves-effect waves-light' onChange={(e) => { handleUpload(e.target.files[0]) }} ref={fileInput} type="file" />
            </div>
            {loading ? <div className="progress">
                <div className="indeterminate"></div>
            </div> : ''}
        </div >
    );
};

export default WebcamCapture;