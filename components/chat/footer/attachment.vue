<template>
    <div v-if="preview" class="row w-100 d-flex justify-content-between pl-4 mb-3" >
        <div class="col-4">
            <div class="preview-img">
                <img :src="preview" v-if="preview" />
            </div>
        </div>
        <div class="col-7 fcc" v-if="!admin">
            <div class="d-flex justify-content-center text-center mt-2 isaticket-q roboto">
                ¿ ESTAS ADJUNTANDO UN COMPROBANTE DE PAGO ?
            </div>
            <div class="d-flex justify-content-around mt-2">
                <button
                    class="btn btn-lg isaticket-a roboto"
                    @click="setIsATicket(true)"
                    :class="{'btn-success':isATicket,'btn-secondary':!isATicket}"
                >SI</button>
                <button
                    class="btn btn-lg isaticket-a roboto"
                    @click="setIsATicket(false)"
                    :class="{'btn-danger':!isATicket,'btn-secondary':isATicket}"
                >NO</button>
            </div>
        </div>
        <div class="col-1 p-0 d-flex flex-column">
            <button class="mat m-1" @click="cancelAttach()">
                <i class="material-icons">close</i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["file"],
    data() {
        return {
            isATicket: false,
            imageUploaded: false,
        };
    },
    computed: {
        preview() {
            if (this.file) {
                this.imageUploaded = true;
                this.isATicket = true;
                return URL.createObjectURL(this.file);
            }
            return null;
        }
    },
    methods: {
        cancelAttach() { 
            this.imageUploaded = false;
            this.$emit('cancelAttach');
        },
        setIsATicket(v) {
            this.isATicket = v;
            this.$emit('isATicketChange', v);
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