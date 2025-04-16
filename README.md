# VNyan SAMMI Extension

This is an extenison for [SAMMI](https://sammi.solutions/) to talk to [VNyan](https://suvidriel.itch.io/vnyan) If you need to go the other direction (vnyan controlling sammi) please check out the [SAMMI VNyan Plugin](https://github.com/swolekat/sammi-vnyan-plugin?tab=readme-ov-file)

# Installation
** PLEASE NOTE. AS OF 4.0.0. ALL COMMUNICATION FROM VNYAN TO SAMMI WILL BE COVERED BY THE PLUGIN **
Inside of SAMMI, on the left select bridge. Select install new extension. Install vnyan-sammi-extension.sef.

Inside of VNyan, if you want to use websockets, make sure you enable `Start Reciever` under the `Websockets` settings section under `Misc`.

That's it. There's no deck, but you should see the extension from inside the bridge

# Usage 
## Sending Data to VNyan
There are two ways you can send commands to VNyan: Websockets and API Messages.

### Websockets
Websockets use the `VNyan Message` command in SAMMI. Inside of VNyan you will use the `WebSocket Command` node.

### API Messages
API Messages use the `VNyan API Message` command in SAMMI. Inside of VNyan you will use the `API Message` node.

## Receiving Data from VNyan
See [SAMMI VNyan Plugin](https://github.com/swolekat/vnyan-sammi-extension)

# Troubleshooting
* Is the websocket receiver turned on?
* Is the port number correct?
* Is the command name spelled correctly?
* Are all of the following running: OBS, SAMMI, VNyan?

# Contact
https://www.twitch.tv/swolekat
