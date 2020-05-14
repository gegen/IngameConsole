fx_version 'adamant'
games {'gta5'}

author 'gegen#4674'
version '1.1'
description 'FiveM Ingame Console'


client_scripts {
    'client.lua'
}
server_scripts {
    'server.lua'
}

ui_page "public/index.html"
files {
    'public/*',
    'public/static/js/*',
    'public/static/css/*'
}