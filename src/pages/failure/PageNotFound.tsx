import { Button } from "@mui/material"

function PageNotFound(): JSX.Element {
  return (
  	<div className="container-fluid">
  		<div className="col-md-6 offset-md-3 text-center mt-5 pt-5">
  			<div className="text-center">
          <h1 className="display-1 align-items-center message-font">
            404
          </h1>
          
          <h3 className="md-0">
            how'd you end up here?...
          </h3>
          
          {/* to={Endpoint.Client.Home} */}
          <Button>
            take me home
          </Button>
        </div>
  	 </div>
  	</div>
  )
}

export default PageNotFound
