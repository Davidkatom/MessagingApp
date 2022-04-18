import { useState } from "react";
import MiniContant from './MiniContant';

const ContactSide = ( {contact_list}) => {


    return (
        <div className="col-5 scrollable" >
            <div className='direction-fix'>
                {/* <button onClick={addContact({ name: 'oo' })} >dsad</button> */}
                {contact_list.map((contactIndex) => (
                    <MiniContant contact={contactIndex} />
                ))}
            </div>
        </div>
    )
}

export default ContactSide