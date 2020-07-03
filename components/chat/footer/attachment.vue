<template>
    <div class="row w-100 d-flex justify-content-between pl-4 mb-3" v-if="preview">
        <div class="col-4">
            <div class="preview-img">
                <img :src="preview" v-if="preview" />
            </div>
        </div>
        <div class="col-7 fcc" v-if="!admin">
            <div
                class="d-flex justify-content-center text-center mt-2 isaticket-q"
            >¿ ESTAS ADJUNTANDO UN COMPROBANTE DE PAGO ?</div>
            <div class="d-flex justify-content-around mt-2">
                <button
                    class="btn btn-lg isaticket-a"
                    @click="setIsATicket(true)"
                    :class="{'btn-success':isATicket,'btn-secondary':!isATicket}"
                >SI</button>
                <button
                    class="btn btn-lg isaticket-a"
                    @click="setIsATicket(false)"
                    :class="{'btn-danger':!isATicket,'btn-secondary':isATicket}"
                >NO</button>
            </div>
        </div>
        <div class="col-1 p-0 d-flex flex-column">
            <button class="mat m-1" @click="resetFileInput()">
                <i class="material-icons">close</i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["preview"],
    data() {
        return {
            preview: null,
            imageUploaded: false,
            file: null,
        };
    },
    methods: {
        onFileChange(e) {
            this.file = e.target.files[0];
            if (file) {
                this.preview = URL.createObjectURL(file);
                this.imageUploaded = true;
            }
            this.emitChanges();
        },
        resetFileInput() {
            this.$refs.fileInput.value = "";
            this.preview = null;
            this.file = null;
            this.imageUploaded = false;
            this.emitChanges();
        },
        setIsATicket(v) {
            this.isATicket = value;
            this.emitChanges();
        },
        emitChanges() {
            this.$emit('attachChange', 
                {
                    file: file, 
                    preview: preview, 
                    isATicket: this.isATicket
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.preview-img {
    width: 120px;
    margin-top: 10px;
}
.isaticket-q {
    font-weight: bold;
    font-size: 20px;
}
.isaticket-a {
    width: 65px;
}

</style>