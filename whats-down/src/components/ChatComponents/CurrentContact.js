const CurrentContact = ({ contact }) => {
    let minipici = "blank-profile-picture.png";
    if (contact() !== undefined) {
        if (contact().picture !== undefined) {
            minipici = contact().picture;
        }
        return (
            <div className="col-7 contact-header">
                <img src={minipici} className="float-start img-thumbnail rounded-start right-padding-for-picture collapse" alt="..."  id="selected-contact-image"/>
                {contact().name}
            </div>
        )

    }
    return (<div className="col-7 contact-header"></div>)
}

export default CurrentContact