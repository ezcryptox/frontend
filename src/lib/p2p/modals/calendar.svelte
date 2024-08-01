<script>
	import { _ } from 'svelte-i18n';
</script>
<div
  class="el-popper is-pure is-light el-picker__popper"
  tabindex="-1"
  aria-hidden="true"
  role="dialog"
  aria-modal="false"
  id="el-id-8688-2"
  data-popper-reference-hidden="false"
  data-popper-escaped="false"
  data-popper-placement="left"
  style="z-index: 1020012; position: absolute; inset: -125.5px 246px auto auto; "
>
  <div
    class="el-picker-panel el-date-range-picker"
    visible="false"
    actualvisible="false"
    format="YYYY-MM-DD"
  >
    <div class="el-picker-panel__body-wrapper">
      <!--v-if-->
      <div class="el-picker-panel__body">
        <!--v-if-->
        <div
          class="el-picker-panel__content el-date-range-picker__content is-left"
        >
          <div class="el-date-range-picker__header">
            <button type="button" class="el-picker-panel__icon-btn d-arrow-left"
              ><i class="el-icon"
                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
                  ><path
                    fill="currentColor"
                    d="M529.408 149.376a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224zm256 0a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224z"
                  ></path></svg
                ></i
              ></button
            ><button type="button" class="el-picker-panel__icon-btn arrow-left"
              ><i class="el-icon"
                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
                  ><path
                    fill="currentColor"
                    d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
                  ></path></svg
                ></i
              ></button
            ><!--v-if--><!--v-if-->
            <div>{$_('2024-june')}</div>
          </div>
          <table
            role="grid"
            aria-label="Use the arrow keys and enter to select the day of the month"
            cellspacing="0"
            cellpadding="0"
            class="el-date-table"
          >
            <tbody
              ><tr
                ><!--v-if--><th scope="col" aria-label="Sunday">{$_('sun')}</th><th
                  scope="col"
                  aria-label="Monday">{$_('mon')}</th
                ><th scope="col" aria-label="Tuesday">{$_('tue')}</th><th
                  scope="col"
                  aria-label="Wednesday">{$_('wed')}</th
                ><th scope="col" aria-label="Thursday">{$_('thu')}</th><th
                  scope="col"
                  aria-label="Friday">{$_('fri')}</th
                ><th scope="col" aria-label="Saturday">{$_('sat')}</th></tr
              ><tr class="el-date-table__row"
                ><td class="prev-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">26</span>
                  </div></td
                ><td class="prev-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">27</span>
                  </div></td
                ><td class="prev-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">28</span>
                  </div></td
                ><td class="prev-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">29</span>
                  </div></td
                ><td class="prev-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">30</span>
                  </div></td
                ><td class="prev-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">31</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="0"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">1</span>
                  </div></td
                ></tr
              ><tr class="el-date-table__row"
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">2</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">3</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">4</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">5</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">6</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">7</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">8</span>
                  </div></td
                ></tr
              ><tr class="el-date-table__row"
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">9</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">10</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">11</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">12</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">13</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">14</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">15</span>
                  </div></td
                ></tr
              ><tr class="el-date-table__row"
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">16</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">17</span>
                  </div></td
                ><td class="available today" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">18</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">19</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">20</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">21</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">22</span>
                  </div></td
                ></tr
              ><tr class="el-date-table__row"
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">23</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">24</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">25</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">26</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">27</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">28</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">29</span>
                  </div></td
                ></tr
              ><tr class="el-date-table__row"
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">30</span>
                  </div></td
                ><td class="next-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">1</span>
                  </div></td
                ><td class="next-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">2</span>
                  </div></td
                ><td class="next-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">3</span>
                  </div></td
                ><td class="next-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">4</span>
                  </div></td
                ><td class="next-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">5</span>
                  </div></td
                ><td class="next-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">6</span>
                  </div></td
                ></tr
              ></tbody
            >
          </table>
        </div>
        <div
          class="el-picker-panel__content el-date-range-picker__content is-right"
        >
          <div class="el-date-range-picker__header">
            <!--v-if--><!--v-if--><button
              type="button"
              class="el-picker-panel__icon-btn d-arrow-right"
              ><i class="el-icon"
                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
                  ><path
                    fill="currentColor"
                    d="M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L764.736 512 452.864 192a30.592 30.592 0 0 1 0-42.688zm-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L508.736 512 196.864 192a30.592 30.592 0 0 1 0-42.688z"
                  ></path></svg
                ></i
              ></button
            ><button type="button" class="el-picker-panel__icon-btn arrow-right"
              ><i class="el-icon"
                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
                  ><path
                    fill="currentColor"
                    d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
                  ></path></svg
                ></i
              ></button
            >
            <div>{$_('2024-july')}</div>
          </div>
          <table
            role="grid"
            aria-label="Use the arrow keys and enter to select the day of the month"
            cellspacing="0"
            cellpadding="0"
            class="el-date-table"
          >
            <tbody
              ><tr
                ><!--v-if--><th scope="col" aria-label="Sunday">{$_('sun')}</th><th
                  scope="col"
                  aria-label="Monday">{$_('mon')}</th
                ><th scope="col" aria-label="Tuesday">{$_('tue')}</th><th
                  scope="col"
                  aria-label="Wednesday">{$_('wed')}</th
                ><th scope="col" aria-label="Thursday">{$_('thu')}</th><th
                  scope="col"
                  aria-label="Friday">{$_('fri')}</th
                ><th scope="col" aria-label="Saturday">{$_('sat')}</th></tr
              ><tr class="el-date-table__row"
                ><td class="prev-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">30</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="0"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">1</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">2</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">3</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">4</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">5</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">6</span>
                  </div></td
                ></tr
              ><tr class="el-date-table__row"
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">7</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">8</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">9</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">10</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">11</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">12</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">13</span>
                  </div></td
                ></tr
              ><tr class="el-date-table__row"
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">14</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">15</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">16</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">17</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">18</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">19</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">20</span>
                  </div></td
                ></tr
              ><tr class="el-date-table__row"
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">21</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">22</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">23</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">24</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">25</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">26</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">27</span>
                  </div></td
                ></tr
              ><tr class="el-date-table__row"
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">28</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">29</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">30</span>
                  </div></td
                ><td class="available" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">31</span>
                  </div></td
                ><td class="next-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">1</span>
                  </div></td
                ><td class="next-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">2</span>
                  </div></td
                ><td class="next-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">3</span>
                  </div></td
                ></tr
              ><tr class="el-date-table__row"
                ><td class="next-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">4</span>
                  </div></td
                ><td class="next-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">5</span>
                  </div></td
                ><td class="next-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">6</span>
                  </div></td
                ><td class="next-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">7</span>
                  </div></td
                ><td class="next-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">8</span>
                  </div></td
                ><td class="next-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">9</span>
                  </div></td
                ><td class="next-month" aria-selected="false" tabindex="-1"
                  ><div class="el-date-table-cell">
                    <span class="el-date-table-cell__text">10</span>
                  </div></td
                ></tr
              ></tbody
            >
          </table>
        </div>
      </div>
    </div>
    <!--v-if-->
  </div>
  <span
    class="el-popper__arrow"
    data-popper-arrow=""
    style="position: absolute; top: 164.5px;"
  ></span>
</div>

