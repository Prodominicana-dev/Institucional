import { notifications } from "@mantine/notifications";
import axios from "axios";

export async function createcontact( FormData:any  , clear: () => void,) {


  const data = FormData

    // console.log('data', data);
    
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/apiv2/mail/contact `

      const response = await axios.post(url,data)

      console.log('this is the status code: ' + response.status);
      

      if (response.status === 201){
        notifications.show({
          id: "contact",
          autoClose: 5000,
          withCloseButton: false,
          title: "Contacto creado",
          message: "Los datos se ha enviado correctamente.",
          color: "green",
          loading: false,
        });

        clear()
      }
      
    } catch (error) {


      console.log('error contact:', error);
      notifications.show({
        id: "contact",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error",
        message: "Ha ocurrido un error al enviar los datos.",
        color: "red",
        loading: false,
      });
      
      
      clear()
    }
    
  }
  