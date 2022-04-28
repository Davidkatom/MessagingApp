import MiniContant from './MiniContant';

const ContactSide = ({ contact_list , selectContact, flag}) => {

    return (
        <div className="col-5 scrollable" id = "contacts">
            <div className='direction-fix'>
                                
                {Object.values(contact_list).map((contactIndex) => (
                    <MiniContant args={{ contact: contactIndex, selectContact: selectContact }} />
                ))}
            </div>
        </div>
    )
    
}


export default ContactSide