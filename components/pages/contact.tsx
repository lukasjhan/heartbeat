import ContactForm from "@/components/pages/contact-form";
import HeadingText from "@/components/heading-text";

export default function Contact() {
  return (
    <main className="container flex flex-col items-center py-8" id="contact">
      <div className="flex flex-col items-center space-y-2 text-center">
        <HeadingText subtext="Send us a message to get in touch with the team">
          Contact
        </HeadingText>
      </div>
      <ContactForm />
    </main>
  );
}
