<template>
  <div class="d-flex justify-center align-center h-100">
    <v-sheet width="350">
      <v-form ref="formRef" @submit.prevent="validate">
        <h2 class="mb-3 text-red">Login Form</h2>
        <p class="mb-8 text-grey-darken-1">Silahkan login untuk melanjutkan kedalam aplikasi</p>
        <div v-if="isError" class="mb-6">
          <v-alert type="error" dense outlined>
            {{ message }}
          </v-alert>
        </div>
        <v-text-field
          class="mb-4"
          v-model="email"
          :rules="emailRules"
          label="E-Mail"
          required
          variant="outlined"
          density="comfortable"
          :loading="isLoading"
          :disabled="isLoading"
        ></v-text-field>

        <v-text-field
          class="mb-4"
          v-model="password"
          label="Password"
          required
          variant="outlined"
          density="comfortable"
          :rules="requiredRules('Password')"
          :loading="isLoading"
          :disabled="isLoading"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <div class="d-flex flex-column">
          <v-btn
            :loading="isLoading"
            :disabled="isLoading"
            class="elevation-0"
            color="red"
            type="submit"
            variant="elevated"
            block
          >
            Login
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import { useAuthStore } from '@/store'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

export default {
  setup() {
    const authStores = useAuthStore()
    const { loginUser } = authStores
    const { isLoading, isError, message } = storeToRefs(authStores)

    const formRef = ref(null)
    const visible = ref(false)
    const email = ref('')
    const password = ref('')
    const emailRules = [
      (v) => !!v || `Email is required`,
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]
    const requiredRules = (fieldName = 'This field') => [(v) => !!v || `${fieldName} is required`]
    const select = ref(null)
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
    const checkbox = ref(false)

    const validate = async () => {
      if (formRef.value) {
        const { valid } = await formRef.value.validate()

        if (valid) {
          const payload = {
            email: email.value,
            password: password.value
          }
          loginUser(payload)
        }
      }
    }

    const reset = () => {
      formRef.value.reset()
    }

    const resetValidation = () => {
      formRef.value.resetValidation()
    }

    return {
      formRef,
      visible,
      email,
      password,
      emailRules,
      requiredRules,
      select,
      items,
      checkbox,
      validate,
      reset,
      resetValidation,
      isLoading,
      isError,
      message
    }
  }
}
</script>
<style></style>
