using core7_reactjs.models;
using Microsoft.AspNetCore.SignalR;

namespace core7_reactjs.SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IDictionary<string, ChatModel> _connections;
        private readonly string _botUser;

        public ChatHub(IDictionary<string, ChatModel> connections) {
            _connections = connections;
            _botUser = "MyRoom";
        }

        public async Task SendMessage(string message) {
            if(_connections.TryGetValue(Context.ConnectionId, out ChatModel model))
            {
                await Clients.Group(model.Room).SendAsync("ReceiveMessage",model.User,message);
            }
        }
        public async Task JoinRoom(ChatModel model) {
            await AddToGroup(_botUser,model.User);
            _connections[Context.ConnectionId] = model;
        }

        public async Task AddToGroup(string groupName, string user)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            
            await Clients.Group(groupName).SendAsync("ReceiveMessage", $"{user} has joined the group.");

        }

    }
}