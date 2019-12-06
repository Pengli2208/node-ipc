'use-strict';

const Message = require('js-message');

function broadcast(type,data){
    this.log('broadcasting event to all known sockets listening to ', this.path,' : ', ((this.port)?this.port:''), type, data);
    let message=new Message;
    message.type=type;
    message.data=data;

    if(this.config.rawBuffer){
        message=Buffer.from(type,this.config.encoding);
    }else{
        message=this.eventParser.format(message);
    }

    if(this.udp4 || this.udp6){
        for(let socket of this.sockets){
            this.socket.write(message,this.config.encoding);
        }
    }else{
        for(let socket of this.sockets){
            socket.write(message,this.config.encoding);
        }
    }
}

module.exports=broadcast;