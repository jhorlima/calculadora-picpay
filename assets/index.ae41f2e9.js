import{r as l,c as p,d as C,I as V,a as E,b as m,e,f as T,w as u,v as x,g as h,h as _,t as d,i as S,F,j as A,k as M,o as g,l as P}from"./vendor.040d3b98.js";const $=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function a(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=a(o);fetch(o.href,r)}};$();var j=(t,s)=>{const a=t.__vccOpts||t;for(const[i,o]of s)a[i]=o;return a};const f=l(),w=l(0),b=l(1),k=l(!1),y=l("boleto"),L=l(3.09),B=l(3.59),I=l(3.69),U=l(500),N=p(()=>{switch(y.value){case"boleto":return`
      Para pagar boletos com cart\xE3o de cr\xE9dito existe uma taxa de <strong>${L.value.toLocaleString("pt-BR",{maximumFractionDigits:2})}%</strong> sobre o valor do pagamento.
      `;case"amigo":return`
      Para pagar um amigo com cart\xE3o de cr\xE9dito, o limite sem cobran\xE7a de taxa \xE9 de <strong>${U.value.toLocaleString("pt-BR",{currency:"BRL",style:"currency"})}</strong> por m\xEAs. Acima desse valor, \xE9 cobrada uma tarifa de <strong>${B.value.toLocaleString("pt-BR",{maximumFractionDigits:2})}%</strong>% sobre o valor que ser\xE1 pago.`;default:return null}}),O=(t,s,a)=>t*(s/(1-(1/(1+s))**a)),R=p(()=>{if(!f.value)return 0;const t=f.value,s=b.value,a=L.value/100,i=I.value/100;let o=0;switch(y.value){case"boleto":o=t+t*a;break;case"amigo":o=(()=>{if(t>500){const r=B.value/100,c=t-500;return 500+c+c*r}return t})();break}return s>1&&(o=O(o,i,s)),o}),v=p(()=>{const t=b.value;return R.value*t}),D=p(()=>{var s;const t=(s=f.value)!=null?s:0;return v.value-t}),q=p(()=>{var t;if(k.value){const s=((t=w.value)!=null?t:0)/100;return v.value*s}return 0}),H=C({name:"AppHome",components:{Icon:V},setup(){return{type:y,payment:f,warning:N,cashback:w,installment:b,useCashback:k,paymentTotal:v,cashbackTotal:q,interestTotal:D,paymentInterest:R,interestInstallments:I}}}),z={class:"px-6 py-5"},J={class:"text-gray-400 flex items-center gap-2"},K=e("span",{class:"text-xxs"},"Calculadora do PicPay",-1),G=e("h1",{class:"text-2xl w-10/12 font-medium mt-5"},"O que deseja calcular?",-1),Q={class:"grid grid-cols-2 gap-x-3 my-3"},W={class:"relative"},X=e("label",{class:"p-2 flex bg-white justify-center rounded-lg cursor-pointer text-green-700 hover:bg-gray-50 focus:outline-none peer-checked:text-white border border-green-300 peer-checked:bg-green-600 peer-checked:border-green-700",for:"type_boleto"},"Boleto",-1),Y={class:"relative"},Z=e("label",{class:"p-2 flex bg-white justify-center rounded-lg cursor-pointer text-green-700 hover:bg-gray-50 focus:outline-none peer-checked:text-white border border-green-300 peer-checked:bg-green-600 peer-checked:border-green-700",for:"type_amigo"},"Um amigo",-1),ee=["innerHTML"],te={class:"grid grid-cols-2 gap-x-3 mb-3"},se=e("label",{for:"payment",class:"block mb-1 text-sm font-medium text-green-600 dark:text-green-600"},"Valor",-1),oe={class:"relative flex w-full flex-wrap items-stretch"},ne=e("span",{class:"w-8 pr-3 py-3 z-10 h-full right-0 rounded absolute text-base font-bold items-center leading-snug bg-transparent justify-center text-center text-green-600"}," R$ ",-1),re={for:"installment",class:"block mb-1 text-sm font-medium text-green-600"},ae=["value"],le={class:"flex items-start mb-3"},ce={class:"flex items-center h-5"},ie=e("div",{class:"ml-2 text-sm"},[e("label",{for:"cashback",class:"font-medium text-green-600"},"Aplicar cashback")],-1),de={key:0,class:"mb-3"},ue={class:"relative flex w-full flex-wrap items-stretch mb-3"},pe=e("span",{class:"w-8 pr-3 py-3 z-10 h-full right-0 rounded absolute text-base font-bold items-center leading-snug bg-transparent justify-center text-center text-green-600"}," % ",-1),me={class:"w-full"},ge={class:"border rounded-lg border-dashed py-2 border-3 bg-green-600"},fe={class:"p-3"},he=e("h5",{class:"text-white"},"Voc\xEA total com taxas",-1),be={class:"flex flex-row items-end"},ye={class:"text-white text-3xl font-bold"},ve=e("div",{class:"flex w-full my-2"},[e("span",{class:"border border-dashed w-full border-white"})],-1),xe={class:"p-3 space-y-3"},_e={class:"flex flex-col"},we=e("span",{class:"text-gray-200"},"Juros total (Taxas)",-1),ke={class:"text-white text-lg font-bold"},Le={class:"flex flex-col"},Be={class:"text-gray-200"},Ie={class:"text-white text-lg font-bold"},Re={key:0,class:"flex flex-col"},Ce=e("span",{class:"text-gray-200"},"Valor do cashback",-1),Ve={class:"text-white text-lg font-bold"};function Ee(t,s,a,i,o,r){const c=E("Icon");return g(),m("section",z,[e("div",J,[T(c,{icon:"simple-icons:picpay"}),K]),G,e("ul",Q,[e("li",W,[u(e("input",{id:"type_boleto","onUpdate:modelValue":s[0]||(s[0]=n=>t.type=n),name:"type",type:"radio",value:"boleto",class:"sr-only peer"},null,512),[[x,t.type]]),X]),e("li",Y,[u(e("input",{id:"type_amigo","onUpdate:modelValue":s[1]||(s[1]=n=>t.type=n),name:"type",type:"radio",value:"amigo",class:"sr-only peer"},null,512),[[x,t.type]]),Z])]),t.warning?(g(),m("div",{key:0,class:"p-3 mb-4 rounded-lg bg-yellow-100 text-sm text-yellow-700 dark:bg-yellow-200 dark:text-yellow-800",role:"alert",innerHTML:t.warning},null,8,ee)):h("",!0),e("form",null,[e("div",te,[e("div",null,[se,e("div",oe,[u(e("input",{id:"payment","onUpdate:modelValue":s[2]||(s[2]=n=>t.payment=n),type:"number",class:"px-3 py-3 pr-10 w-full shadow text-sm relative bg-white rounded-lg focus:ring outline-none text-green-600 focus:outline-none placeholder-green-500 border border-green-300",required:""},null,512),[[_,t.payment]]),ne])]),e("div",null,[e("label",re,"Total de parcelas ("+d(t.interestInstallments.toLocaleString("pt-BR",{maximumFractionDigits:2}))+"% a.m.)",1),u(e("select",{id:"installment","onUpdate:modelValue":s[3]||(s[3]=n=>t.installment=n),class:"px-3 py-3 pr-10 w-full shadow text-sm relative bg-white rounded-lg focus:ring outline-none text-green-600 focus:outline-none placeholder-green-500 border border-green-300"},[(g(),m(F,null,A(12,n=>e("option",{key:n,value:n},d(n+"x"),9,ae)),64))],512),[[S,t.installment]])])]),e("div",le,[e("div",ce,[u(e("input",{id:"cashback","onUpdate:modelValue":s[4]||(s[4]=n=>t.useCashback=n),type:"checkbox",class:"w-4 h-4 rounded-lg bg-green-50 border border-green-300 focus:ring-3 focus:ring-green-300"},null,512),[[M,t.useCashback]])]),ie]),t.useCashback?(g(),m("div",de,[e("div",ue,[u(e("input",{"onUpdate:modelValue":s[5]||(s[5]=n=>t.cashback=n),type:"number",placeholder:"Cashback",class:"px-3 py-3 pr-10 w-full shadow text-sm relative bg-white rounded-lg focus:ring outline-none text-green-600 focus:outline-none placeholder-green-500 border border-green-300"},null,512),[[_,t.cashback]]),pe])])):h("",!0),e("div",me,[e("div",ge,[e("div",fe,[he,e("div",be,[e("span",ye,d(t.paymentTotal.toLocaleString("pt-BR",{currency:"BRL",style:"currency"})),1)])]),ve,e("div",xe,[e("div",_e,[we,e("span",ke,d(t.interestTotal.toLocaleString("pt-BR",{currency:"BRL",style:"currency"})),1)]),e("div",Le,[e("span",Be,"Valor da parcela ("+d(t.installment)+"x)",1),e("span",Ie,d(t.paymentInterest.toLocaleString("pt-BR",{currency:"BRL",style:"currency"})),1)]),t.useCashback?(g(),m("div",Re,[Ce,e("span",Ve,d(t.cashbackTotal.toLocaleString("pt-BR",{currency:"BRL",style:"currency"})),1)])):h("",!0)])])])])])}var Te=j(H,[["render",Ee]]);const Se=P(Te);Se.mount("#app");