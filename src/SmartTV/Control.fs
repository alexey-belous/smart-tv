namespace SmartTV
module Control = 
    open System.Diagnostics
    open FParsec

    type ControlCommand = 
        | MoveMouse of string
        | MouseClick of string
        | TypeText of string
        | Key of string

    let xdotoolClient args = 
        let xdotool = Process.Start("xdotool", args)
        xdotool.Start() |> ignore
        xdotool.WaitForExit()

    let xdotCommand cmd = 
        match cmd with 
        | MouseClick mouseButton -> sprintf "click %s" mouseButton |> xdotoolClient
        | MoveMouse coords -> sprintf "mousemove_relative %s" coords |> xdotoolClient
        | TypeText text -> sprintf "type \"%s\"" text |> xdotoolClient
        | Key k -> sprintf "key %s" k |> xdotoolClient

