<template>
    <ContentDoc v-slot="{doc}">
        <div class="m-center">
            <div class="m-con">
                <cd/>
                <header class="m-center">
                    <h1 class="text-2xl ">{{ doc.title }}</h1>
                </header>
                <ContentRender :doc="doc"/>
            </div>
        </div>
    </ContentDoc>
</template>
