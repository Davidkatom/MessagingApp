import MiniContant from './MiniContant';

const ContactSide = ({ contact_list , selectContact}) => {
    return (
        <div className="col-5 scrollable" id = "contacts">
            <div className='direction-fix'>
                {Object.values(contact_list).map((contactIndex) => (
                    //todo: fix the bug where Each child in a list should have a unique "key" prop
                    <MiniContant args={{ contact: contactIndex, selectContact: selectContact }} />
                ))}
            </div>
        </div>
    )
    
}


export default ContactSide