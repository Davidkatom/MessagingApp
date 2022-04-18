
const CurrentContact = ({ contact_name }) => {
    return (
        <div className="col-7 contact-header">
            <img src="cake.jpg" className="float-start img-thumbnail rounded-start right-padding-for-picture" alt="..." />
            {contact_name}
        </div>
    )
}

export default CurrentContact