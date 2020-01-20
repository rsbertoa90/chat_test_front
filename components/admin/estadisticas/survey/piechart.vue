


<script>
import { Pie } from 'vue-chartjs'
export default {
  extends: Pie,
  props:['chartdata'],
  
  mounted () {
    this.renderChart(this.chartdata, this.options)
  },
  computed:{
    options(){
      return{
        
          responsive: true,
          maintainAspectRatio: false,
          onClick: this.handle
    
      }
    }
  },
  methods:{
    
      handle (point, event) {
    	const item = event[0]
    	this.$emit('clicked', {
      	index: item._index,
        backgroundColor: item._view.backgroundColor,
      
      })
    }
    
  }
}
</script>


<style>
</style>