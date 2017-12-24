namespace SmartTV

module Program = 
    open Suave
    open Suave.Successful
    open Commands

    [<EntryPoint>]
    let main argv =
        
        let config = { defaultConfig with bindings = [HttpBinding.createSimple HTTP "0.0.0.0" 8080] }

        let server = 
            choose [
                receiveCommandEndpoint
            ]

        startWebServer config server

        0
