const products=[
{id:1,name:'Cruz + Corazón',cat:'HOLOGRÁFICO',cats:['CELULARES','FE'],desc:'Acabado tornasolado',image:'assets/images/sticker-1.jpg',new:true,trend:true},
{id:2,name:'Calavera Sombrero',cat:'HOLOGRÁFICO',cats:['MOTOS','AUTOS'],desc:'Acabado tornasolado',image:'assets/images/sticker-2.jpg',new:true,trend:true},
{id:3,name:'Dios es fiel',cat:'HOLOGRÁFICO',cats:['CELULARES','FE'],desc:'Mensaje de fe · holográfico',image:'assets/images/dios-es-fiel.jpg',new:true,trend:true},
{id:4,name:'Chico Capucha',cat:'VINIL',cats:['CELULARES','LAPTOPS'],desc:'Diseño urbano',image:'assets/images/sticker-4.jpg',trend:true},
{id:5,name:'Gato X',cat:'VINIL',cats:['MOTOS','AUTOS'],desc:'Diseño divertido',image:'assets/images/sticker-5.jpg',trend:true},
{id:6,name:'Fantasma No',cat:'VINIL',cats:['AUTOS','LAPTOPS'],desc:'Diseño divertido',image:'assets/images/sticker-6.jpg',new:true,trend:true},
{id:7,name:'Emoji Enojado',cat:'VINIL',cats:['CELULARES','LAPTOPS'],desc:'Diseño expresivo',image:'assets/images/sticker-7.jpg'},
{id:8,name:'Emoji Te veo',cat:'VINIL',cats:['MOTOS','AUTOS'],desc:'Diseño expresivo',image:'assets/images/sticker-8.jpg'},
{id:9,name:'Mano esqueleto',cat:'VINIL',cats:['CELULARES','FE'],desc:'diseño urbano',image:'assets/images/sticker-9.jpg',new:true},
{id:10,name:'Oración',cat:'VINIL',cats:['MOTOS','AUTOS'],desc:'Mensaje de fe',image:'assets/images/sticker-10.jpg',new:true,trend:true},
{id:11,name:'RAPTOR',cat:'VINIL',cats:['AUTOS','MOTOS'],desc:'Diseño automotriz',image:'assets/images/sticker-11.jpg',new:true},
{id:12,name:'TRD',cat:'VINIL',cats:['AUTOS','MOTOS'],desc:'Diseño automotriz',image:'assets/images/sticker-12.jpg',new:true},
{id:13,name:'FUERA DE LA CARRETERA',cat:'VINIL',cats:['AUTOS','MOTOS'],desc:'Diseño todoterreno',image:'assets/images/sticker-13.jpg',new:true}
];
let filter='TODOS',cart=[];
const $=s=>document.querySelector(s);
function render(){
 const q=$('#search').value.trim().toLowerCase();
 const list=products.filter(p=>{
  const f=filter==='TODOS'||p.cat===filter||p.cats.includes(filter)||(filter==='NUEVOS'&&p.new)||(filter==='TENDENCIA'&&p.trend);
  const s=!q||(p.name+' '+p.cat+' '+p.desc+' '+p.cats.join(' ')).toLowerCase().includes(q);
  return f&&s;
 });
 $('#count').textContent=`${list.length} producto${list.length===1?'':'s'}`;
 $('#products').innerHTML=list.map(p=>`<article class="product">
 <div class="product-img"><img loading="lazy" src="${p.image}" alt="Sticker ${p.name}">${p.new?'<span class="badge-new">NUEVO</span>':''}<span class="material">${p.cat==='HOLOGRÁFICO'?'🌈 Holográfico':'Vinil'}</span></div>
 <div class="product-body"><div class="tag-row"><small>${p.cats[0]}</small></div><h3>${p.name}</h3><p>${p.desc}</p>
 <div class="price-line"><b>Desde Q10</b><span>2 tamaños</span></div>
 <div class="sizes"><button data-add="${p.id}" data-size="5×5 cm" data-price="10">5×5 · Q10</button><button data-add="${p.id}" data-size="10×10 cm" data-price="15">10×10 · Q15</button></div></div></article>`).join('')||'<div class="empty" style="grid-column:1/-1">No encontramos ese diseño. Prueba otra búsqueda.</div>';
}
function sync(){const n=cart.reduce((a,x)=>a+x.qty,0);$('#cartBadge').textContent=n;$('#floatCount').textContent=n;renderCart()}
function add(id,size,price){const p=products.find(x=>x.id===id);const x=cart.find(x=>x.id===id&&x.size===size);x?x.qty++:cart.push({id,name:p.name,size,price,qty:1});sync();openCart()}
function changeQty(i,d){if(!cart[i])return;cart[i].qty+=d;if(cart[i].qty<=0)cart.splice(i,1);sync()}
function renderCart(){
 if(!cart.length){$('#cartItems').innerHTML='<div class="empty">Tu carrito está vacío.<br>Elige un tamaño para agregar un sticker.</div>';$('#total').textContent='Q0';return}
 let total=0;
 $('#cartItems').innerHTML=cart.map((x,i)=>{total+=x.price*x.qty;return `<div class="cart-row"><div class="cart-info"><b>${x.name}</b><small>${x.size} · Q${x.price}</small></div><div class="qty"><button data-minus="${i}">−</button><b>${x.qty}</b><button data-plus="${i}">+</button></div></div>`}).join('');
 $('#total').textContent='Q'+total;
}
function openCart(){$('#drawer').classList.add('open');$('#overlay').classList.add('show');document.body.classList.add('locked')}
function closeCart(){$('#drawer').classList.remove('open');$('#overlay').classList.remove('show');document.body.classList.remove('locked')}
function sendOrder(){if(!cart.length)return openCart();let total=0;const lines=cart.map(x=>{total+=x.price*x.qty;return `• ${x.name} — ${x.size} — Q${x.price} × ${x.qty}`});const msg=`Hola, quiero hacer este pedido en ALPHA STICKERS GT:\n\n${lines.join('\n')}\n\nTotal: Q${total}\n\n¿Me confirma disponibilidad?`;window.open('https://wa.me/50230241372?text='+encodeURIComponent(msg),'_blank','noopener')}
$('#products').addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(b)add(Number(b.dataset.add),b.dataset.size,Number(b.dataset.price))});
$('#cartItems').addEventListener('click',e=>{const m=e.target.closest('[data-minus]'),p=e.target.closest('[data-plus]');if(m)changeQty(Number(m.dataset.minus),-1);if(p)changeQty(Number(p.dataset.plus),1)});
$('#search').addEventListener('input',render);
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;render()}));
$('#openCart').onclick=openCart;$('#floatCart').onclick=openCart;$('#closeCart').onclick=closeCart;$('#overlay').onclick=closeCart;$('#sendOrder').onclick=sendOrder;$('#menuBtn').onclick=()=>$('#mobileNav').classList.toggle('show');document.querySelectorAll('.mobile-nav a').forEach(a=>a.onclick=()=>$('#mobileNav').classList.remove('show'));
render();sync();
