const MiniContant = ({ contact }) => {
  return (
    <div>
      <div class="card mb-0" >
        <div class="row g-0">
          <div class="col-md-2">
            <img src="cake.jpg" class="img-fluid rounded-start" alt="..."/>

          </div>
          <div class="col-md-10">
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h4 class="card-title" style={{ textAlign: 'left' }}>{contact.contact_name}</h4>
                </div>
                <div class="col">
                  <p class="card-text" style={{ textAlign: 'right'  }}><small class="text-muted">
                    {/* Last updated 3 mins ago */}
                    {Date().toLocaleString()}
                    </small></p>
                </div>
              </div>

              <p class="card-text">This is a wider card withitionals a wider card withitional s a wider . </p>

            </div>
          </div>
        </div>
      </div>


      {/* <label class="input-group-text" >{contact.contact_name}</label> */}
    </div>
  )
}

export default MiniContant