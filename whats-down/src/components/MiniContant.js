import '../index.css';

const MiniContant = ({ contact }) => {
  return (
    <div>
      <div class="card mb-0" >
        <div class="row g-0">
          <div class="col-sm-2">
            <img src="cake.jpg" class="img-fluid rounded-start" alt="..."/>

          </div>
          <div class="col-sm-10">
            <div class="card-body low-padding">
              <div class="row">
                <div class="col">
                  <h4 class="card-title" style={{ textAlign: 'left' }}>{contact.contact_name}</h4>
                </div>
                <div class="col">
                  <p class="card-text" style={{ textAlign: 'right'  }}><small class="text-muted">
                    {contact.last_message_time}
                    {/* {Date().toLocaleString()} */}
                    </small></p>
                </div>
              </div>

              <p class="card-text">{contact.last_message}</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniContant