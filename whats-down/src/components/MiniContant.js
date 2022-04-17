const MiniContant = ({ contact }) => {
  return (
    <div>
      <div class="card mb-3" >
        <div class="row g-0">
          <div class="col-md-4">
            <img src="cake.jpg" class="img-fluid rounded-start" alt="..."/>

          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{contact.contact_name}</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>


      {/* <label class="input-group-text" >{contact.contact_name}</label> */}
    </div>
  )
}

export default MiniContant