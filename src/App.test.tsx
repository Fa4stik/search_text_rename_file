import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks()

const baseUrl = 'http://213.171.5.243/api'

describe('Fetch tests', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('get-ocr-models', async () => {
    const mockReps = {
      models1: [
        "pytesseract",
        "easyocr",
        "easyocrCustom"
      ]
    }
    fetchMock.mockResponseOnce(JSON.stringify(mockReps))
    // const resp = await getOcrModels()

    expect(fetchMock).toHaveBeenCalledWith("http://213.171.5.243/api/get-ocr-models/", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    // expect(resp).toEqual(mockReps)
  })
})
