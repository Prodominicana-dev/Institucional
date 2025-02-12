// import { notifications } from "@mantine/notifications";
// import axios from "axios";

// export async function createRating(data: any, clear: () => void) {
// try {
//     const url = `${process.env.NEXT_PUBLIC_API_URL}/apiv2/rating-servicces`
//     const response = await axios.post(url, data)

//     if(response.status === 201){
//         notifications.show({
//             id:"rating",
//             autoClose:5000,
//             withCloseButton:false,
//             title:"Calificaion creada",
//             color: "green",
//             message: 'La Calificaion se ha enviada correctamente'

//         })
//     }
    
// } catch (error) {
//     console.log(error);

//     notifications.show({
//         id:"rating",
//         autoClose:5000,
//         withCloseButton:false,
//         title:"Error de calificacion creada",
//         message: 'Ha ocurrido un erro al crear la calificacion'
//     })
    
    
// }
// }