namespace SmartTV

module Commands = 
    open Chiron
    open Chiron.Operators

    open Suave
    open Suave.Filters
    open Suave.Successful
    open Suave.Operators

    open Control

    type Command = 
        {
            CommandType: string
            Payload: string
        }
        static member FromJson(_: Command) = 
                    fun c p -> { CommandType = c; Payload = p }
                <!> Json.read "commandType"
                <*> Json.read "payload"

    let receiveCommand : WebPart = 
            fun (x: HttpContext) -> async {
                    let parseForm data : Command = data |> Json.parse |> Json.deserialize

                    let command = 
                        x.request.rawForm 
                        |> System.Text.Encoding.UTF8.GetString
                        |> parseForm

                    match command.CommandType with
                    | "mouse-move" -> command.Payload |> MoveMouse |> xdotCommand
                    | "mouse-click" -> command.Payload |> MouseClick |> xdotCommand
                    | "type" -> command.Payload |> TypeText |> xdotCommand
                    | "key" ->  printfn "%A" command.Payload
                                command.Payload |> Key |> xdotCommand

                    return! OK "" x
                }

    let receiveCommandEndpoint = 
        choose [
            POST >=> path "/command" >=> receiveCommand
        ]
