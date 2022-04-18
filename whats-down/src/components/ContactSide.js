import { useState } from "react";
import MiniContant from './MiniContant';

const ContactSide = ( {args}) => {


    return (
        <div className="col-5 scrollable" >
            <div className='direction-fix'>
                {/* <button onClick={addContact({ name: 'oo' })} >dsad</button> */}
                {args.contact_list.map((contactIndex) => (
                    <MiniContant args={{contact:contactIndex,selectContact:args.selectContact}} />
                ))}
            </div>
        </div>
    )
}

export default ContactSide