local display = false
local resourceNameIsValid = false

function SetDisplay(bool)
    display = bool
    SetNuiFocus(bool, bool)
    SendNUIMessage({
        type = "ui",
        status = bool
    })
end

RegisterNUICallback("exit", function()
    SetDisplay(false)
end)

RegisterNUICallback("CheckPasssword", function(pwd)
    TriggerServerEvent("console:CheckPasssword", pwd)
end)
RegisterNetEvent("console:SetAuth")
AddEventHandler("console:SetAuth", function(isAuthed)
    SendNUIMessage({
        type = "SetAuth",
        auth = isAuthed
    })
end)
RegisterNetEvent("console:ErrorMsg")
AddEventHandler("console:ErrorMsg", function(error)
    SendNUIMessage({
        type = "ErrorMsg",
        error = error
    })
end)

RegisterCommand('console', function()
    if resourceNameIsValid then
        SetDisplay(true)
    else
        TriggerEvent('chat:addMessage', {
            color = { 255, 0, 0},
            multiline = true,
            args = {"Error", "'"..GetCurrentResourceName().."' is not a valid resource name. You may only use lowercase characters, - or _"}
        })
    end
end, false)

-- Initializing:
Citizen.CreateThread(function()
    Wait(1000) -- Make sur NUI has loaded
    
    if string.match(GetCurrentResourceName(), '[^a-z-_]') == nil then -- Make sure resource name is valid for NUI
        resourceNameIsValid = true
        SendNUIMessage({
            type = "ResourceName",
            value = GetCurrentResourceName()
        })
        SetDisplay(false)
    end

    -- Main Loop:
    while true do 
        if display then
            InvalidateIdleCam()
            N_0x9e4cfff989258472() --Disable the vehicle idle camera
        end
        Citizen.Wait(1000)
    end
end)

-- Console Logic:
RegisterNetEvent("console:UpdateConsoleBuffer")
AddEventHandler("console:UpdateConsoleBuffer", function(buffer)
    buffer = buffer:gsub("\n", "<br />") --Convert JSON newlines to HTML newlines
    SendNUIMessage({
        type = "ConsoleBuffer",
        data = json.encode(buffer)
    })
end)

RegisterNUICallback("ExecuteConsoleCommand", function(cmd)
    TriggerServerEvent("console:ExecuteConsoleCommand", cmd)
end)