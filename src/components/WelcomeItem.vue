<template>
  <div class="item">
    <i>
      <!-- 在 Vue.js 中，slot 是用于在组件内部插入外部内容的一种机制。它的主要作用是让父组件向子组件传递结构化的内容，
       从而提高组件的复用性和灵活性。通过 slot，你可以在子组件的指定位置插入任意内容，而不用事先在子组件中写死这些内容。
       主要作用：

    内容分发：slot 允许父组件将自定义的内容传递到子组件中，而子组件只负责定义布局或模板，不关心具体内容。
    提高复用性：通过 slot，可以让一个子组件接受不同的内容，从而实现高度的组件复用。
    动态内容渲染：父组件可以根据需要动态改变传入的内容，而子组件能够灵活展示这些内容。
        如果需要在子组件中定义多个插槽，Vue.js 提供了具名插槽的功能。可以给每个插槽命名，并在父组件中指定向哪个插槽传递内容。
        比如：
        <template #icon>
          <DocumentationIcon />
        </template>
        会被传递到 <slot name="icon"></slot> 中。
        -->
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <!-- 在子组件中，你可以使用 <slot> 标签定义一个插槽，这个插槽会被父组件传入的内容填充。 -->
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
