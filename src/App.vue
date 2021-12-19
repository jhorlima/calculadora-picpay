<script lang="ts">
import { Icon } from '@iconify/vue';
import { ref, computed, defineComponent } from 'vue';

const payment = ref<number>();
const cashback = ref<number>(0);
const installment = ref<number>(1);
const useCashback = ref<boolean>(false);
const type = ref<'boleto' | 'amigo'>('boleto');

const interestCard = ref(3.09);
const interestFriend = ref(3.59);
const interestInstallments = ref(3.69);

const limitFriend = ref(500);

const warning = computed<string | null>(() => {
  switch (type.value) {
    case 'boleto':
      return `
      Para pagar boletos com cartão de crédito existe uma taxa de <strong>${interestCard.value.toLocaleString(
        'pt-BR',
        { maximumFractionDigits: 2 }
      )}%</strong> sobre o valor do pagamento.
      `;
    case 'amigo':
      return `
      Para pagar um amigo com cartão de crédito, o limite sem cobrança de taxa é de <strong>${limitFriend.value.toLocaleString(
        'pt-BR',
        { currency: 'BRL', style: 'currency' }
      )}</strong> por mês. Acima desse valor, é cobrada uma tarifa de <strong>${interestFriend.value.toLocaleString(
        'pt-BR',
        { maximumFractionDigits: 2 }
      )}%</strong>% sobre o valor que será pago.`;
    default:
      return null;
  }
});

const installmentsMonth = (
  total: number,
  interest: number,
  installments: number
) => {
  return total * (interest / (1 - (1 / (1 + interest)) ** installments));
};

const paymentInterest = computed(() => {
  if (!payment.value) {
    return 0;
  }

  const valuePayment = payment.value;
  const valueInstallment = installment.value;
  const valueInterestCard = interestCard.value / 100;
  const valueInterestInstallments = interestInstallments.value / 100;

  let paymentTotal = 0;

  switch (type.value) {
    case 'boleto':
      paymentTotal = valuePayment + valuePayment * valueInterestCard;
      break;
    case 'amigo':
      paymentTotal = (() => {
        if (valuePayment > 500) {
          const valueInterestFriend = interestFriend.value / 100;
          const remaining = valuePayment - 500;
          return 500 + remaining + remaining * valueInterestFriend;
        }

        return valuePayment;
      })();

      break;
  }

  if (valueInstallment > 1) {
    paymentTotal = installmentsMonth(
      paymentTotal,
      valueInterestInstallments,
      valueInstallment
    );
  }

  return paymentTotal;
});

const paymentTotal = computed(() => {
  const valueInstallment = installment.value;
  return paymentInterest.value * valueInstallment;
});

const interestTotal = computed(() => {
  const valuePayment = payment.value ?? 0;
  return paymentTotal.value - valuePayment;
});

const cashbackTotal = computed(() => {
  if (useCashback.value) {
    const valueCashback = (cashback.value ?? 0) / 100;
    return paymentTotal.value * valueCashback;
  }
  return 0;
});

export default defineComponent({
  name: 'AppHome',
  components: {
    Icon,
  },
  setup() {
    return {
      type,
      payment,
      warning,
      cashback,
      installment,
      useCashback,
      paymentTotal,
      cashbackTotal,
      interestTotal,
      paymentInterest,
      interestInstallments,
    };
  },
});
</script>

<template>
  <section class="px-6 py-5">
    <div class="text-gray-400 flex items-center gap-2">
      <Icon icon="simple-icons:picpay" />
      <span class="text-xxs">Calculadora do PicPay</span>
    </div>
    <h1 class="text-2xl w-10/12 font-medium mt-5">O que deseja calcular?</h1>
    <ul class="grid grid-cols-2 gap-x-3 my-3">
      <li class="relative">
        <input
          id="type_boleto"
          v-model="type"
          name="type"
          type="radio"
          value="boleto"
          class="sr-only peer"
        />
        <label
          class="
            p-2
            flex
            bg-white
            justify-center
            rounded-lg
            cursor-pointer
            text-green-700
            hover:bg-gray-50
            focus:outline-none
            peer-checked:text-white
            border border-green-300
            peer-checked:bg-green-600 peer-checked:border-green-700
          "
          for="type_boleto"
          >Boleto</label
        >
      </li>

      <li class="relative">
        <input
          id="type_amigo"
          v-model="type"
          name="type"
          type="radio"
          value="amigo"
          class="sr-only peer"
        />
        <label
          class="
            p-2
            flex
            bg-white
            justify-center
            rounded-lg
            cursor-pointer
            text-green-700
            hover:bg-gray-50
            focus:outline-none
            peer-checked:text-white
            border border-green-300
            peer-checked:bg-green-600 peer-checked:border-green-700
          "
          for="type_amigo"
          >Um amigo</label
        >
      </li>
    </ul>
    <div
      v-if="warning"
      class="
        p-3
        mb-4
        rounded-lg
        bg-yellow-100
        text-sm text-yellow-700
        dark:bg-yellow-200 dark:text-yellow-800
      "
      role="alert"
      v-html="warning"
    ></div>
    <form>
      <div class="grid grid-cols-2 gap-x-3 mb-3">
        <div>
          <label
            for="payment"
            class="
              block
              mb-1
              text-sm
              font-medium
              text-green-600
              dark:text-green-600
            "
            >Valor</label
          >
          <div class="relative flex w-full flex-wrap items-stretch">
            <input
              id="payment"
              v-model="payment"
              type="number"
              class="
                px-3
                py-3
                pr-10
                w-full
                shadow
                text-sm
                relative
                bg-white
                rounded-lg
                focus:ring
                outline-none
                text-green-600
                focus:outline-none
                placeholder-green-500
                border border-green-300
              "
              required
            />
            <span
              class="
                w-8
                pr-3
                py-3
                z-10
                h-full
                right-0
                rounded
                absolute
                text-base
                font-bold
                items-center
                leading-snug
                bg-transparent
                justify-center
                text-center text-green-600
              "
            >
              R$
            </span>
          </div>
        </div>
        <div>
          <label
            for="installment"
            class="block mb-1 text-sm font-medium text-green-600"
            >Total de parcelas ({{
              interestInstallments.toLocaleString('pt-BR', {
                maximumFractionDigits: 2,
              })
            }}% a.m.)</label
          >
          <select
            id="installment"
            v-model="installment"
            class="
              px-3
              py-3
              pr-10
              w-full
              shadow
              text-sm
              relative
              bg-white
              rounded-lg
              focus:ring
              outline-none
              text-green-600
              focus:outline-none
              placeholder-green-500
              border border-green-300
            "
          >
            <template v-for="installment in 12" :key="installment">
              <option :value="installment">{{ installment + 'x' }}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="flex items-start mb-3">
        <div class="flex items-center h-5">
          <input
            id="cashback"
            v-model="useCashback"
            type="checkbox"
            class="
              w-4
              h-4
              rounded-lg
              bg-green-50
              border border-green-300
              focus:ring-3 focus:ring-green-300
            "
          />
        </div>
        <div class="ml-2 text-sm">
          <label for="cashback" class="font-medium text-green-600"
            >Aplicar cashback</label
          >
        </div>
      </div>
      <div v-if="useCashback" class="mb-3">
        <div class="relative flex w-full flex-wrap items-stretch mb-3">
          <input
            v-model="cashback"
            type="number"
            placeholder="Cashback"
            class="
              px-3
              py-3
              pr-10
              w-full
              shadow
              text-sm
              relative
              bg-white
              rounded-lg
              focus:ring
              outline-none
              text-green-600
              focus:outline-none
              placeholder-green-500
              border border-green-300
            "
          />
          <span
            class="
              w-8
              pr-3
              py-3
              z-10
              h-full
              right-0
              rounded
              absolute
              text-base
              font-bold
              items-center
              leading-snug
              bg-transparent
              justify-center
              text-center text-green-600
            "
          >
            %
          </span>
        </div>
      </div>
      <div class="w-full">
        <div class="border rounded-lg border-dashed py-2 border-3 bg-green-600">
          <div class="p-3">
            <h5 class="text-white">Você total com taxas</h5>
            <div class="flex flex-row items-end">
              <span class="text-white text-3xl font-bold">{{
                paymentTotal.toLocaleString('pt-BR', {
                  currency: 'BRL',
                  style: 'currency',
                })
              }}</span>
            </div>
          </div>
          <div class="flex w-full my-2">
            <span class="border border-dashed w-full border-white"></span>
          </div>
          <div class="p-3 space-y-3">
            <div class="flex flex-col">
              <span class="text-gray-200">Juros total (Taxas)</span>
              <span class="text-white text-lg font-bold">{{
                interestTotal.toLocaleString('pt-BR', {
                  currency: 'BRL',
                  style: 'currency',
                })
              }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-200"
                >Valor da parcela ({{ installment }}x)</span
              >
              <span class="text-white text-lg font-bold">{{
                paymentInterest.toLocaleString('pt-BR', {
                  currency: 'BRL',
                  style: 'currency',
                })
              }}</span>
            </div>
            <div v-if="useCashback" class="flex flex-col">
              <span class="text-gray-200">Valor do cashback</span>
              <span class="text-white text-lg font-bold">{{
                cashbackTotal.toLocaleString('pt-BR', {
                  currency: 'BRL',
                  style: 'currency',
                })
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

