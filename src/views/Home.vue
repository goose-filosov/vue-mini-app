<template>
  <div class="home">
    <h2 class="display-1 text-center mt-4 mb-12">Будь на высоте!</h2>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-card max-width="300px" class="mx-auto">
            <v-card-title>Узнавай погоду!</v-card-title>
            <v-img
              src="@/assets/undraw_weather_app_i5sm.svg"
              height="250px"
              aspect-ratio="1.5"
            ></v-img>
            <v-card-actions class="mt-2">
              <v-btn
                to="/weather"
                class="card-btn elevation-4"
                color="purple lighten-3 white--text"
                >Посмотреть погоду</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card max-width="300px" class="mx-auto">
            <v-card-title>Создавай задачи!</v-card-title>
            <v-img
              src="@/assets/undraw_project_completed_w0oq.svg"
              height="250px"
              aspect-ratio="1.5"
            ></v-img>
            <v-card-actions class="mt-2">
              <v-btn
                to="task"
                class="card-btn elevation-4"
                color="purple lighten-3 white--text"
                >Создать задачу</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card max-width="300px" class="mx-auto">
            <v-card-title>Выполняй дела!</v-card-title>
            <v-img
              src="@/assets/undraw_Checklist_7dx2.svg"
              height="250px"
              aspect-ratio="1.5"
            ></v-img>
            <v-card-actions class="mt-2">
              <v-btn
                to="/todo"
                class="card-btn elevation-4"
                color="purple lighten-3 white--text"
                >Создать дело</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card-btn {
  width: 100%;
}
</style>
