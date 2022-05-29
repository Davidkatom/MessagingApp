
const CurrentContact = ({ contact }) => {
    console.log("pic:")
    let minipici = contact().picture;
    if (minipici === undefined) {
        minipici = "blank-profile-picture.png";
    }
    return (
        <div className="col-7 contact-header">
            <img src={minipici} className="float-start img-thumbnail rounded-start right-padding-for-picture collapse" alt="..."  id="selected-contact-image"/>
            {contact().name}
        </div>
    )
}

export default CurrentContact