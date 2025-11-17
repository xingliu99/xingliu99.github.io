(() => {
    dayjs.extend(window.dayjs_plugin_duration)
    const el = document.getElementById('realtime_duration')
    // 改成自己的时间
    const date = dayjs('2023-06-06')

    const updateDuration = () => {
        const dur = dayjs.duration(dayjs().diff(date))
        const days = String(Math.floor(dur.asDays()))
        const newContent = '启动时长超过 ' + days + dur.format('天HH时mm分ss秒')

        if (el.textContent !== newContent) {
            el.textContent = newContent
        }
    }

    setInterval(updateDuration, 1000)
    updateDuration() // 立即更新一次以避免初始延迟

    // setInterval(() => {
    //     const dur = dayjs.duration(dayjs().diff(date))
    //     const days = String(Math.floor(dur.asDays()))
    //     el.textContent = '启动时长超过 ' + days + dur.format('天HH时mm分ss秒')
    // }, 1000)
})()