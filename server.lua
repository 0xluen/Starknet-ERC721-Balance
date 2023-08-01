local socket = require("socket")

local host = "localhost"
local port = 8080


function handleRequest(client)
    local request = client:receive()
    local response

    if request:find("GET /query") then
        response = "HTTP/1.1 200 Internal Server Error\r\nContent-Type: text/plain\r\n\r\nHello World!"
    else
        response = "HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\nPage not found!"
    end

    client:send(response)
    client:close()
end

local server = assert(socket.bind(host, port))

print("Web server running: http://" .. host .. ":" .. port .. "/")

while true do
    local client = server:accept()
    handleRequest(client)
end