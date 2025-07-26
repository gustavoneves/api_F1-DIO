import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({logger: true});

server.register(cors, {
    origin: "*",
    methods: ["GET"]
});

const teams = [
  { id: 1, name: "Mercedes", base: "Brackley, Reino Unido" },
  { id: 2, name: "Red Bull Racing", base: "Milton Keynes, Reino Unido" },
  { id: 3, name: "Ferrari", base: "Maranello, Itália" },
  { id: 4, name: "McLaren", base: "Woking, Reino Unido" },
  { id: 5, name: "Alpine", base: "Enstone, Reino Unido" },
  { id: 6, name: "Aston Martin", base: "Silverstone, Reino Unido" },
  { id: 7, name: "Alfa Romeo", base: "Hinwil, Suíça" },
  { id: 8, name: "Haas", base: "Kannapolis, EUA" },
  { id: 9, name: "Williams", base: "Grove, Reino Unido" },
  { id: 10, name: "AlphaTauri", base: "Faenza, Itália" }
]

const drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Lewis Hamilton", team: "Mercedes" },
  { id: 3, name: "Charles Leclerc", team: "Ferrari" },
  { id: 4, name: "Sergio Perez", team: "Red Bull Racing" },
  { id: 5, name: "Lando Norris", team: "McLaren" },
  { id: 6, name: "George Russell", team: "Mercedes" },
  { id: 7, name: "Carlos Sainz", team: "Ferrari" },
  { id: 8, name: "Daniel Ricciardo", team: "AlphaTauri" },
  { id: 9, name: "Sebastian Vettel", team: "Aston Martin" },
  { id: 10, name: "Valtteri Bottas", team: "Alfa Romeo" }
]

server.get("/teams", async(request, response) => {
    response.type("application/json").code(200);

    // return [
    //     {id: 1, name: "Ferrari"}
    // ];
    return teams;
});

server.get("/drivers", async(request, response) => {
    response.type("application/json").code(200);

    // return [
    //     {id: 1, name: "Max Verstappen", team: "Red Bull Racing"}
    // ];
    return drivers;
})

interface DriverParams {
    id: string;
}

server.get<{Params: DriverParams}>("/drivers/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find( d => d.id === id);

    if(!driver){
        response.type("application/json").code(404);
        return {
            message: "Driver not found"
        }
    }
    else{
        response.type("application/json").code(200);
        return {
            driver
        }
    }

})

server.listen({port: 3333}, () => {
    console.log("Server init");
})



console.log("hello world");
