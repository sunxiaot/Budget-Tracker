
import React, { useEffect, useState } from "react";



const DataForm = (props) => {
    useEffect(() => {
        console.log(props)
    })

    return (
        <div >
            <div style={{ marginTop: '10px', marginLeft: '10px' }}>
                <a href="/" ><i className="material-icons">Back</i></a>
            </div>
            <ul className="collection with-header">
                <li className="collection-header"><h4>Recipt Information</h4></li>
                <li className="collection-item"><div>Total<a href="#!" className="secondary-content"><i className="material-icons">{"$" + props.data.total}</i></a></div></li>
                <li className="collection-item"><div>Date<a href="#!" className="secondary-content"><i className="material-icons">{props.data.date}</i></a></div></li>
                <li className="collection-item"><div>Category
                    <select dir="rtl" class="browser-default secondary-content" style={{ width: 'auto', height: 'auto', textAlign: 'right', border: '0px' }}>
                        <option value="" disabled selected>Choose category</option>
                        <option value="1">Food</option>
                        <option value="2">Transport</option>
                        <option value="3">Makeup</option>
                    </select></div></li>
                <li className="collection-item"><div>Pay By <select dir="rtl" class="browser-default secondary-content" style={{ width: 'auto', height: 'auto', textAlign: 'right', border: '0px' }}>
                    <option value="" disabled selected>Choose payment method</option>
                    <option value="1">Credit card</option>
                    <option value="2">Debit card</option>
                    <option value="3">Cash</option>
                </select></div></li>
            </ul>
            <div style={{ marginTop: '10px', marginLeft: '10px', textAlign: 'center' }}>
                <button className="btn waves-effect waves-light" type="submit" name="action">submit
                </button>
            </div>
        </div >
    );
};

export default DataForm;