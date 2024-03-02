package fabo.proyectodsw.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fabo.proyectodsw.api.entities.Message;
import fabo.proyectodsw.api.entities.Uemail;
import fabo.proyectodsw.api.repositories.MessageRepository;


@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getMessages(Uemail uemail){
        return messageRepository.findByUemail(uemail);
    }

    public Optional<Message> getMessage(int id){
        return messageRepository.findById(id);
    }

    public String sendMessage(String email, String sender, String subject, String message) {
        Uemail uemail = new Uemail();
        uemail.setEmail(email);
        Message newMessage = new Message();
        newMessage.setUemail(uemail);
        newMessage.setSender(sender);
        newMessage.setSubject(subject);
        newMessage.setMessage(message);
        messageRepository.save(newMessage);
        return "Mensaje enviado con éxito.";
    }
}
