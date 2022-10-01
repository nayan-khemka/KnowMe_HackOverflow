import React from "react";
import "../Pages/CSS/Switch.css";
import cx from "classnames"

const Switch = () => {

    const sliderCX = cx('slider',
    {'rounded':true})
    return(
    <label className = "switch">
        <input type ="checkbox"/>
        <span className={sliderCX } />
    </label>
    )
}

export default Switch;