package fabo.proyectodsw.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fabo.proyectodsw.api.entities.Message;
import fabo.proyectodsw.api.entities.Uemail;
import fabo.proyectodsw.api.services.MessageService;
import fabo.proyectodsw.api.services.UemailService;


@RestController
@CrossOrigin
@RequestMapping("/message")
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private UemailService uemailService;

    @GetMapping("/get/{email}")
    public List<Message> getMessages(@PathVariable String email){
        Uemail uemail = uemailService.getUemail(email).get();
        return messageService.getMessages(uemail);
    }

    @GetMapping("/getById/{id}")
    public Message getMessage(@PathVariable int id){
        return messageService.getMessage(id).get();
    }

    @PostMapping("/send")
    public String sendMessage(@RequestBody Message message){
        return messageService.sendMessage(message.getUemail().getEmail(), message.getSender(), message.getSubject(), message.getMessage());
    }
}
