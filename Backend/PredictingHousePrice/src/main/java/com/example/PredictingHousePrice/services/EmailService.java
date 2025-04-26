package com.example.PredictingHousePrice.services;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class EmailService {

    private final String sendgridApiKey;

    public EmailService() {
        // Lấy API key từ môi trường
        this.sendgridApiKey = System.getProperty("SENDGRID_API_KEY");
    }

    public void sendResetCode(String toEmail, String code) throws IOException {
        // Lấy FROM_EMAIL từ môi trường
        String fromEmail = System.getProperty("FROM_EMAIL");

        if (fromEmail == null || fromEmail.isEmpty()) {
            throw new IOException("FROM_EMAIL chưa được cấu hình.");
        }

        Email from = new Email(fromEmail);
        String subject = "Mã xác nhận đặt lại mật khẩu";
        Email to = new Email(toEmail);
        Content content = new Content("text/plain", "Mã xác nhận của bạn là: " + code);
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid(this.sendgridApiKey);
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            sg.api(request);
        } catch (IOException ex) {
            throw ex;
        }
    }
}
