app.component('product-display',{
    props:{
        premium:{
            type: Boolean,
            required: true,
        },

    },
    template:
    /*html*/
    `<div class="product-display">
    <div class ="product-container">
      <div class=" product-image"
      :class = "{'out-of-stock-img': !inStock}">
      <img v-bind:src = "image">
      </div>
      <div class="product-info">
        <h1>{{title}}</h1>
        <p>{{description}}</p>
        <ul >
             <li v-for="detail in details">{{detail}}</li>
        </ul>
        
        <p v-if="inventory>50">In Stock</p>
        <p v-else-if="inventory <=50  && inventory >0">Almost Sold out!</p>
        <p v-else>Out of Stock</p>
        

           
        <p> Shipping : {{ shipping}}</p>
        <p v-if="onSale">On Sale</p>
        

        <div id ="colors"
        v-for="(variant, index) in variants" 
        :key="variant.id" 
        @mouseover="updateVariant(index)"
        class="color-circle"
        v-bind:style="{backgroundColor:variant.color}">
    </div>
    
        <button class="button" 
          :class="{disabledButton: !inStock}"
          :disabled="!inStock"
          v-on:click="addToCart"> 
          Add to cart
        </button>

        <button 
        class="button" 
        :class="{ disabledButton: !inStock }" 
        :disabled="!inStock" 
        @click="removeFromCart">
        Remove Item
        </button>
      </div>
      <review-form></review-form>
    </div>`,
    data: function(){
        return {
            product:'T-Shirts',
            brand: "Doriant",
            description: 'Cotton Tees for daily wear.',
            selectedVariant: 0,
            inventory: 0,
            onSale: true,
            details: ['50% Cotton', '50% Polyester'],
            variants: [
                {id:002, color: 'Red', image: "./assets/images/s_red.jpg", quantity : 10},
                {id:001, color: 'White', image : "./assets/images/s_white.jpg", quantity: 50,},
                {id:003, color: 'Black', image: "./assets/images/s_black.jpg", quantity : 100},
                {id:004, color: 'Blue', image: "./assets/images/s_blue.jpg", quantity : 120},
                {id:005, color: 'Maroon', image: "./assets/images/s_maroon.jpg", quantity : 200},
                {id:006, color: 'Yellow', image: "./assets/images/s_yellow.jpg", quantity : 8},
            ],
            sizes: ['Small', 'Medium', 'Large']
        }   
        },
    methods: {
        addToCart() {
            this.$emit('add-to-cart',this.variants[this.selectedVariant].id)
        },
        removeFromCart() {
            this.$emit('remove-from-cart',this.variants[this.selectedVariant].id)
        },
        updateVariant(index){
            this.selectedVariant = index
            
        }

    },
    computed: {
        title(){
            return this.brand +' ' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].image
            
        },
        inStock(){
            return this.variants[this.selectedVariant].quantity
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
                return '$2.99'
        }        
    },

})