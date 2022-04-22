//Mini contact blocks on the left side of the chat window
import LastMessageCalc from "../../functions/LastMessageCalc"
import TimeStempCalc from "../../functions/TimeStempCalc"
const MiniContant = ( {args} ) => {

  return (
    <div>
      <div className="card mb-0" onClick={()=>args.selectContact(args.contact)}>
        <div className="row g-0">
          {/*picture of mini contact */}
          <div className="col-sm-2"><img src="blank-profile-picture.png" className="img-thumbnail " alt="..." /></div>
          {/* body of mini contact */}
          <div className="col-sm-10 contact_selection" id={args.contact.contact_name}>
            <div className="card-body low-padding">
              <div className="row">
                <div className="col">
                  <h4 className="card-title" style={{ textAlign: 'left' }}>{args.contact.contact_name}</h4>
                </div>
                <div className="col">
                  <p className="card-text" style={{ textAlign: 'right' }}><small className="text-muted">
                    {TimeStempCalc(args.contact.last_message.props.timeStamp)}
                  </small></p>
                </div>
              </div>

              <p className="card-text">{LastMessageCalc(args.contact.last_message)}</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniContant