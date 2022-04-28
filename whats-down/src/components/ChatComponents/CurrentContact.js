
const CurrentContact = ({ contact }) => {
    return (
        <div className="col-7 contact-header">
            <img src={contact.picture} className="float-start img-thumbnail rounded-start right-padding-for-picture collapse" alt="..."  id="selected-contact-image"/>
            {contact.display_name}
        </div>
    )
}

export default CurrentContact