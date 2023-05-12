import {NuxtLink} from "#components";

export default function Cd(props: any) {
    const route = useRoute()
    return (
        <NuxtLink
            class="no-underline opacity-70"
            to={route.path.split('/').slice(0, -1).join('/') || '/'}
        >
            cd
            ..
        </NuxtLink>
    )
}
