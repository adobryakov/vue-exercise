<template>
  <v-app>
    <v-content>
      <v-container fluid grid-list-xl class="pt-2">
        <v-layout row wrap>
          <v-flex xs12>
            <v-card>

              <v-card-text>
                <v-layout row wrap justify-space-between>
                  <v-flex>
                    <p class="headline mb-0">Performers</p>
                  </v-flex>
                  <v-flex text-xs-right>
                    <v-dialog v-model="isDialogOpened" max-width="600px">
                      <template v-slot:activator="{ on }">
                        <v-btn
                                depressed
                                color="primary"
                                class="mr-0"
                                v-on="on"
                        >Add responsible</v-btn>
                      </template>

                      <!-- Add/edit Performer -->
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text flat floating outline>
                          <v-container grid-list-md>
                            <v-layout wrap column>
                              <v-flex>
                                <v-autocomplete
                                        v-model="editedItem.name"
                                        :items="staff"
                                        outline
                                        label="Responsible name"
                                        item-text="name"
                                        item-value="name"
                                        clearable
                                >
                                  <template v-slot:selection="data">
                                    <v-chip
                                            :selected="data.selected"
                                            close
                                            class="chip--select-multi"
                                            @input="remove(data.item)"
                                    >
                                      <v-avatar>
                                        <img :src="data.item.avatar" />
                                      </v-avatar>
                                      {{ data.item.name }}
                                    </v-chip>
                                  </template>
                                  <template v-slot:item="data">
                                    <template v-if="typeof data.item !== 'object'">
                                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                                    </template>
                                    <template v-else>
                                      <v-list-tile-avatar>
                                        <img :src="data.item.avatar" />
                                      </v-list-tile-avatar>
                                      <v-list-tile-content>
                                        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                        <v-list-tile-sub-title
                                                v-html="data.item.department"
                                        ></v-list-tile-sub-title>
                                      </v-list-tile-content>
                                    </template>
                                  </template>
                                </v-autocomplete>
                              </v-flex>
                              <v-flex>
                                <v-checkbox
                                        hide-details
                                        color="primary"
                                        v-model="editedItem.top"
                                        label="Responsible"
                                ></v-checkbox>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn depressed color="primary" @click="save">Save</v-btn>
                          <v-btn outline color="primary" @click="close">Cancel</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-flex>
                </v-layout>
              </v-card-text>

              <v-data-table
                      :headers="headers"
                      :items="performers"
                      :pagination.sync="pagination"
                      item-key="name"
                      hide-actions
                      id="tableperformers"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.department }}</td>
                  <td v-if="!checked">{{ props.item.date }}</td>
                  <td>
                    <v-checkbox
                            hide-details
                            color="primary"
                            v-model="props.item.top"
                            :value="props.item.top"
                    ></v-checkbox>
                  </td>
                  <td>
                    <v-icon small @click="editItem(props.item)">mdi-pencil</v-icon>
                    <v-icon small @click="deleteItem(props.item)" class="ml-2">mdi-delete</v-icon>
                  </td>
                </template>
                <template v-slot:no-data>
                  No performers
                  <v-btn depressed color="primary" @click="initialize">Re-initialize data</v-btn>
                </template>
              </v-data-table>
              <v-divider></v-divider>
              <v-card-text>
                <v-btn depressed color="primary" class="ml-0">Save</v-btn>
                <v-btn outline color="primary">Cancel</v-btn>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
const srcs = {
  1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
  2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
  3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
  4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
  5: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
};
export default {
  components: { },
  data: () => ({
    checked: false,
    isDialogOpened: false,

    staff: [
      { header: "Software development" },

      {
        name: "Ivan Ivanov",
        department: "Software development",
        avatar: srcs[1]
      },
      {
        name: "Petr Petrov",
        department: "Software development",
        avatar: srcs[2]
      },

      { divider: true },
      { header: "Human Resources" },
      {
        name: "Irina Khomyakova",
        department: "Human Resources",
        avatar: srcs[3]
      },
      {
        name: "Anna Petrova",
        department: "Human Resources",
        avatar: srcs[4]
      },
      {
        name: "Lena Ivanova",
        department: "Human Resources",
        avatar: srcs[5]
      }
    ],

    // Old

    date: new Date().toISOString().substr(0, 10),

    headers: [
      { text: "Performer employee", align: "left", value: "name" },
      { text: "Department", align: "left", value: "department" },
      { text: "Deadline", align: "left", value: "date" },
      { text: "Responsible", align: "left", value: "top" },
      { text: "Actions", align: "left", value: "action" }
    ],

    performers: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      department: "",
      date: "",
      top: ""
    },
    defaultItem: {
      name: "",
      department: "",
      date: "",
      top: 0
    },
    pagination: {
      rowsPerPage: -1,
      sortBy: "name"
    }
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },
  methods: {
    addTask() {},
    initialize() {
      this.performers = [
        {
          name: "Ivan Ivanov",
          department: "Software development",
          date: "2019-10-12",
          top: true
        },
        {
          name: "Petr Petrov",
          department: "Software development",
          date: "2019-10-12",
          top: false
        },
        {
          name: "Irina Khomyakova",
          department: "Human Resources",
          date: "2022-10-23",
          top: false
        }
      ];
    },
    editItem(item) {
      this.isDialogOpened = true;
      // todo open edit dialog
    },

    deleteItem(item) {
      // todo remove item with confirm window
    },
    close() {
      this.isDialogOpened = false;
      // todo clear data if needed
    },

    save() {
      // todo save this.editedItem in this.performers
      this.close();
    }
  },
  computed: {
    formTitle() {
      // todo return "Add performer" or "Edit performer" depends on action
      return "form header";
    }
  }
};
</script>
