import state from "./state.js";

const checkAvaibility = () =>{
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            if (!state.isCoffeeMachineBusy){
                resolve('Mesin siap digunakan');
            }else{
                reject('Maaf,Mesin sedang digunakan')
            }
        }, 3000);
    });
};

const  checkStock = () =>{
    return new Promise((resolve,reject) =>{
        setTimeout(() => {
            if (state.stock.coffeeBeans >= 16 && state.stock.water >= 250) {
                resolve('Bahan cukup untuk membuat 1 kopi');
            } else {
                reject('Maaf, Bahan tidak cukup digunakan untuk membuat kopi');
            }
        }, 3000);
    });
};

const boilWater = () =>{
    return new Promise((resolve,reject) =>{
        console.log('Memanaskan air.......')
        setTimeout(() => {
            resolve('Air sudah dipanaskan')
        }, 2000);
    });
};

const grindCoffee = () => {
    return new Promise((resolve,reject) =>{
        console.log('Meyiapkan kopi untuk digiling')
        setTimeout(() => {
            resolve('kopi sudah di giling,kopi siap')
        }, 1000);
    });
};

const brewCoffee = () =>{
    console.log('Membuatkan kopi untuk Anda')
    state.stock.water -= 250;
    state.stock.coffeeBeans -= 16;
    state.isCoffeeMachineBusy = true;
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('Kopi sudah siap');
        }, 5000);
    });
};

const getCoffee = () =>{
    return new Promise((resolve,reject)=>{
        const seeds = 100;
        setTimeout(() => {
            if (seeds >10){
                resolve('Kopi didapatkan');
            }else{
                reject('Biji kopi habis');
            }
        }, 1000);
    })
}

async function makeCoffee() {
  try {
      await checkAvaibility();
      await checkStock();
      await Promise.all([boilWater(),grindCoffee()]);
      const coffee = await brewCoffee();
      console.log(coffee);
  } catch (rejectedReason) {
      console.log(rejectedReason)
  }
}

makeCoffee();


