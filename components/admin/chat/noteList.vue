<template>
    <div>
        <div class="m-3">Observaciones del Cliente</div>
        <form class="d-flex note-form" @submit.prevent="addNote()">
            <input placeholder="nueva observación" class="form-control" type="text" v-model="newNote" />
            <button type="submit">
                <i class="material-icons">add</i>
            </button>
        </form>
        <div v-for="note in conversation.notes" :key="note.id" class="d-flex note">
            <span class="w-100">{{ note.content }}</span>
            <button @click="deleteNote(note)">
                <i class="material-icons">delete</i>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            newNote: ""
        };
    },
    props: ["conversation"],
    methods: {
        addNote() {
            this.newNote = this.newNote.trim();
            if (this.newNote) {
                let data = {
                    conversation_id: this.conversation.id,
                    content: this.newNote
                };
                this.$axios.post("/conversation-note", data).then((c) => {
                    console.log(c);
                    this.newNote = "";
                });
            }
        },
        deleteNote(note) {
            this.$axios.delete(`/conversation-note/${note.id}`).then((d) => {
                console.log(d);
            });
        }
    }
};
</script>
<style scoped>
.note-form {
    margin-right: 24px;
    margin-bottom: 12px;
    box-shadow: 1px 1px 2px #ccc;
    transition: box-shadow ease-out 0.2s ;
}
.note-form:hover {
    box-shadow: 2px 2px 4px #ccc;
}
input {
    border: 0;
}
input:focus {
    outline: none;
    border: none;
    box-shadow: none;

}
button {
    background: transparent;
    border: none;
    padding: 0;
    width: 38px;
}

button:active {
    border:none;
}

.note {
    width: auto;
    margin: 4px 24px 0 0;
    padding: 4px 0 4px 16px;
    box-shadow: 1px 1px 2px #ccc;
}
</style>