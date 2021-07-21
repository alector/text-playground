const myDownloader = async url => {
  try {
    await PromiseDownloadAsync(url)
    await PromiseSaveAsync(url)
  } catch (e) {
    console.log(e.message)
  }
}
