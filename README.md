# FiveM Ingame Console
An in-game console for FiveM with original Windows cmd looks including color support. Execute commands from in-game and see feedback, ideal for debugging.
Example commands: start, stop, restart, status, clientkick, tempban etc. Also supports ESX and commands from any other framework.

![Console Preview](/preview.png)

# Installation
* Download latest release
* Add it to your servers resource folder
* Edit your `server.cfg` and add:
```
  start console 
  add_ace resource.console command allow
```

# How to use
Enter '/console' in chat. A prompt will appear enter your servers rcon password found in your `server.cfg`.
You will now have access to the servers console. 
Note: Pressing the x in the top right will only close the console in-game, your server won't stop.
You will get logged back in if you rejoin.
> Change your rcon password to force everyone to relogin.