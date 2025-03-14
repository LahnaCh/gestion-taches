import { Router } from "express";
import { addTodo, getTodos, updateTodo } from "./model/todo.js";
import { prisma } from "./prisma/client.js"; 


const router = Router();

//Definition des routes

// Route pour obtenir la liste des taches
router.get("/api/todos", async (request, response) => {
    try {
        const todos = await getTodos();
        return response.status(200).json(todos);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

// Route pour ajouter une tache
router.post("/api/todo", async (request, response) => {
    try {
        const { description } = request.body;
        const todo = await addTodo(description);
        return response
            .status(200)
            .json({ todo, message: "Tache ajoutée avec succès" });
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

// Route pour mettre à jour une tache
router.patch("/api/todo/:id", async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const { description, priority, status } = request.body; // On récupère les nouvelles valeurs

        const updatedTodo = await updateTodo(id, { 
            description, 
            priority, 
            status, 
            updatedAt: Date.now() // ✅ Mise à jour automatique du timestamp
        });

        return response
            .status(200)
            .json({ updatedTodo, message: "Tâche mise à jour avec succès" });
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});


//Route pour mettre a jour une tache en utilisant la methode PUT avec query
router.put("/api/todo", async (request, response) => {
    try {
        const id = parseInt(request.query.id);
        const { description, priority, status } = request.body; // On récupère les nouvelles valeurs

        const updatedTodo = await updateTodo(id, { 
            description, 
            priority, 
            status, 
            updatedAt: Date.now() // ✅ Mise à jour automatique du timestamp
        });

        return response
            .status(200)
            .json({ updatedTodo, message: "Tâche mise à jour avec succès" });
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

// Route pour supprimer une tâche
router.delete("/api/todo/:id", async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        await prisma.todo.delete({ where: { id } });
        return response.status(200).json({ message: "Tâche supprimée avec succès" });
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});


export default router;
