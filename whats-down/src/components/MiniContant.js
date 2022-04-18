import '../index.css';

const MiniContant = ( {args} ) => {
  const temp = () => {
    args.selectContact(args.contact)
  }
  return (
    <div>
      <div className="card mb-0" onClick={temp}>
        <div className="row g-0">
          <div className="col-sm-2">
            <img src="cake.jpg" className="img-fluid rounded-start" alt="..." />

          </div>
          <div className="col-sm-10 contact_selection" id={args.contact.contact_name}>
            <div className="card-body low-padding">
              <div className="row">
                <div className="col">
                  <h4 className="card-title" style={{ textAlign: 'left' }}>{args.contact.contact_name}</h4>
                </div>
                <div className="col">
                  <p className="card-text" style={{ textAlign: 'right' }}><small className="text-muted">
                    {args.contact.last_message_time}
                    {/* {Date().toLocaleString()} */}
                  </small></p>
                </div>
              </div>

              <p className="card-text">{args.contact.last_message}</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniContant